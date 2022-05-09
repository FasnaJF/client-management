<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRegisterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'first_name'        => 'required|string|max:255',
            'surname'           => 'required|string|max:255',
            'email'             => [
                'required_with:confirm_email',
                'same:confirm_email',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'confirm_email'     => 'string|email|max:255',
            'password'          => 'required_with:confirm_password|same:confirm_password|min:6',
            'confirm_password'  => 'min:6'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()->first(),
            'status' => true
        ], 422));
    }
}
