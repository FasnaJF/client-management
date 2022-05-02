<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => [
                'required_with:confirm_email',
                'same:confirm_email',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'confirm_email' => 'string|email|max:255',
            'password' => 'required_with:confirm_password|same:confirm_password|min:6',
            'confirm_password' => 'min:6'
        ];
    }
}
