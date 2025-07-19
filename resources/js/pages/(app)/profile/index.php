<?php

use Ozmos\Viper\Attrs\Name;
use Ozmos\Viper\Attrs\Action;

return new #[Name('profile')] class {
  #[Action]
  public function updateUser(\App\Data\Requests\UpdateProfileRequest $request)
  {
    auth()->user()->update($request->toArray());
  }

  #[Action]
  public function deleteUser()
  {
    auth()->user()->delete();
    auth()->logout();
  }
};
