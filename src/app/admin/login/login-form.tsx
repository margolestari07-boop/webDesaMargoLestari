"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { message: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={formAction}
      aria-busy={pending}
      aria-describedby={state.message ? "login-message" : undefined}
      className="admin-login-form"
    >
      <div className="admin-form-field">
        <Label htmlFor="email">Email</Label>
        <div className="admin-field-wrap">
          <span aria-hidden="true" className="material-symbols-outlined">
            mail
          </span>
          <Input
            autoComplete="username"
            id="email"
            name="email"
            placeholder="nama@desa.id"
            required
            type="email"
          />
        </div>
      </div>
      <div className="admin-form-field">
        <Label htmlFor="password">Kata sandi</Label>
        <div className="admin-field-wrap admin-field-wrap--password">
          <span aria-hidden="true" className="material-symbols-outlined">
            lock
          </span>
          <Input
            autoComplete="current-password"
            id="password"
            name="password"
            required
            type={showPassword ? "text" : "password"}
          />
          <button
            aria-label={
              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            aria-pressed={showPassword}
            className="admin-password-toggle"
            onClick={() => setShowPassword((value) => !value)}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>
      {state.message ? (
        <p className="admin-login-error" id="login-message" role="alert">
          <span aria-hidden="true" className="material-symbols-outlined">
            error
          </span>
          {state.message}
        </p>
      ) : null}
      <Button disabled={pending} type="submit">
        {pending ? "Memeriksa…" : "Masuk"}
      </Button>
    </form>
  );
}
