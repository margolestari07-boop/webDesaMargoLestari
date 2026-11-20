"use client";

import { useActionState, useState } from "react";
import { EyeCloseIcon, EyeIcon } from "@/components/tailadmin/icons";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { Button } from "@/components/tailadmin/ui/button";
import { Field, FieldLabel } from "@/components/tailadmin/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/tailadmin/ui/input-group";
import { Input } from "@/components/tailadmin/ui/input";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { message: null };

// Formulir masuk dengan komponen form TailAdmin asli (Field, FieldLabel,
// Input, InputGroup, Button, Alert). Logika — loginAction, id, label,
// aria-label tombol tampil/sembunyikan kata sandi — tidak berubah.
export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.message ? (
        <Alert id="login-message" variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          autoComplete="email"
          id="email"
          inputMode="email"
          name="email"
          placeholder="nama@contoh.id"
          required
          type="email"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Kata sandi</FieldLabel>
        <InputGroup>
          <InputGroupInput
            autoComplete="current-password"
            id="password"
            name="password"
            placeholder="Masukkan kata sandi"
            required
            type={showPassword ? "text" : "password"}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label={
                showPassword
                  ? "Sembunyikan kata sandi"
                  : "Tampilkan kata sandi"
              }
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Button className="w-full" disabled={pending} size="lg" type="submit">
        {pending ? "Memeriksa…" : "Masuk"}
      </Button>
    </form>
  );
}
