<?php

use App\Data\Requests\LoginRequest;
use Illuminate\Validation\ValidationException;
use Ozmos\Viper\Attrs\Name;
use Ozmos\Viper\Attrs\Action;

return new #[Name('login')] class {
  #[Action]
  public function login(LoginRequest $request)
  {
    if (!auth()->attempt($request->toArray())) {
      throw ValidationException::withMessages([
        'email' => ['Invalid username or password'],
      ]);
    }
  }
};
