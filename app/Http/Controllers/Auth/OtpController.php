<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\OtpMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class OtpController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->email;

        // Ensure user exists, if not, create a basic one (or we can just reject if we want invite-only)
        $user = User::firstOrCreate(
            ['email' => $email],
            ['name' => explode('@', $email)[0]] // Default name
        );

        $otpCode = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('login_otps')->updateOrInsert(
            ['email' => $email],
            [
                'otp_code' => $otpCode,
                'expires_at' => Carbon::now()->addMinutes(5),
                'updated_at' => Carbon::now(),
            ]
        );

        Mail::to($email)->send(new OtpMail($otpCode));

        return response()->json(['message' => 'OTP sent successfully']);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp_code' => 'required|string|size:6'
        ]);

        $record = DB::table('login_otps')
            ->where('email', $request->email)
            ->where('otp_code', $request->otp_code)
            ->first();

        if (!$record || Carbon::parse($record->expires_at)->isPast()) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }

        $user = User::where('email', $request->email)->first();
        
        Auth::login($user, true); // login and remember
        
        // Delete used OTP
        DB::table('login_otps')->where('email', $request->email)->delete();

        // Regenerate session
        $request->session()->regenerate();

        return response()->json(['redirect' => route('dashboard', absolute: false)]);
    }
}
