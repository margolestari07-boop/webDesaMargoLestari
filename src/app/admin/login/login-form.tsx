"use client";

import { useActionState } from "react";
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

  return (
    <form
      action={formAction}
      aria-busy={pending}
      aria-describedby={state.message ? "login-message" : undefined}
      className="admin-login-form"
    >
      <div className="admin-form-field">
        <Label htmlFor="email">Email</Label>
        <Input
          autoComplete="username"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <div className="admin-form-field">
        <Label htmlFor="password">Kata sandi</Label>
        <Input
          autoComplete="current-password"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      {state.message ? (
        <p className="admin-login-error" id="login-message" role="alert">
          {state.message}
        </p>
      ) : null}
      <Button disabled={pending} type="submit">
        {pending ? "Memeriksa…" : "Masuk"}
      </Button>
    </form>
  );
}
