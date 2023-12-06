<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class BaseFormRequest extends FormRequest
{
    use ApiResponse;
    /**
     * Kimlik doğrulama varsa true yoksa false yapıyoruz.
     *
     * @return bool
    */
    public function authorize()
    {
        return true;
    }

    /**
     * Bir sorun oluştuğu zaman hata döner.
     *
     * @param Validator $validator
     * @return JsonResponse
    */
    protected function failedValidation(Validator $validator) : JsonResponse
    {
        $messages =  $validator->errors()->messages();
        throw new HttpResponseException(
            $this->unprocessableApiResponse($messages)
        );
    }
}
