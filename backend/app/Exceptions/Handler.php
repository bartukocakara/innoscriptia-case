<?php

namespace App\Exceptions;

use App\Traits\ApiResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;


class Handler extends ExceptionHandler
{
    use ApiResponse;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return $this->notFoundApiResponse();
            }
        });

        $this->renderable(function (MethodNotAllowedHttpException $e, $request) {
            if ($request->is('api/*')) {
                return $this->notFoundApiResponse();
            }
        });

        $this->renderable(function (QueryException $e, $request) {
            if ($request->is('api/*')) {
                return $this->catchApiResponse($e);
            }
        });

        $this->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return $this->unauthorizedApiResponse();
            }
        });
    }

    /**
     * Create a response object from the given validation exception.
     *
     * @param  \Illuminate\Validation\ValidationException  $exception
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function convertValidationExceptionToResponse(ValidationException $exception, $request)
    {
        if ($exception->response)
            return $exception->response;

        return $this->unprocessableApiResponse($exception->validator->errors()->getMessages());
    }
}
