<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otpCode;

    public function __construct($otpCode)
    {
        $this->otpCode = $otpCode;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'LODEXI Login Verification Code',
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: '<div><h2>Your LODEXI Verification Code is: <strong>' . $this->otpCode . '</strong></h2><p>This code will expire in 5 minutes. If you did not request this, please ignore this email.</p></div>',
        );
    }
}
