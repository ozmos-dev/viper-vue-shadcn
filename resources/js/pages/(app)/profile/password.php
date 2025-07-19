<?php

use Ozmos\Viper\Attrs\Name;
use Ozmos\Viper\Attrs\Action;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Data\Requests\ChangePasswordRequest;

return new #[Name('profile.password')] class {
  #[Action]
  public function resetPassword(ChangePasswordRequest $request)
  {
    if (!Hash::check($request->old_password, request()->user()->password)) {
      throw ValidationException::withMessages([
        'old_password' => ['Incorrect password'],
      ]);
    }

    request()
      ->user()
      ->update(['password' => $request->new_password]);
  }
};
