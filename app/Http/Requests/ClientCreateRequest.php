<?php

namespace App\Http\Requests;

use App\Models\Client;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ClientCreateRequest extends FormRequest
{
    public function authorize()
    {
        return ($this->user()->can('create', Client::class) || $this->user()->can('update',  Admin::class, Client::class));
    }

    public function rules()
    {
        return [

            'first_name'        => 'required|string|max:255',
            'surname'           => 'required|string|max:255',
            'email'             => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:clients,email',
            ],
            'profile_picture'   => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'admin_id'          => 'required'

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
