<?php

namespace App\Http\Requests;

use App\Models\Admin;
use App\Models\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ClientUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return ($this->user()->can('create', Client::class) || $this->user()->can('update', Admin::class, Client::class));
    }

    public function rules()
    {
        return [

            'id'            => 'required|numeric',
            'first_name'    => 'required|string|max:255',
            'surname'       => 'required|string|max:255',
            'email'         => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:clients,email,' . $this->id,
            ],
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
