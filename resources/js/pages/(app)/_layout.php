<?php

use App\Data\UserData;
use Illuminate\Support\Facades\Hash;
use Ozmos\Viper\Attrs\Middleware;
use Ozmos\Viper\Attrs\Prop;
use Ozmos\Viper\Attrs\Action;

return new #[Middleware(['auth'])] class {
  #[Prop]
  public function user(): UserData
  {
    return UserData::from(request()->user());
  }

  #[Action]
  public function logout()
  {
    auth()->logout();
  }

  #[Action]
  public function confirmPassword()
  {
    if (!Hash::check(request()->password, request()->user()->password)) {
      throw \Illuminate\Validation\ValidationException::withMessages([
        'password' => ['Invalid password'],
      ]);
    }

    request()->session()->passwordConfirmed();

    return ['ok' => true];
  }
};
