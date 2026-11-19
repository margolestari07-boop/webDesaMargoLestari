"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { idleFormState } from "@/lib/content/form";
import { changeEmailAction, changePasswordAction } from "./actions";

export function AccountForms({ currentEmail }: { currentEmail: string }) {
  const [emailState, emailAction, emailPending] = useActionState(
    changeEmailAction,
    idleFormState,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePasswordAction,
    idleFormState,
  );

  return (
    <>
      <form
        action={emailAction}
        aria-busy={emailPending}
        className="admin-settings-form"
      >
        <fieldset className="admin-settings-group">
          <legend>Ubah email login</legend>
          {emailState.kind === "success" && emailState.message ? (
            <p className="admin-settings-success" role="status">
              {emailState.message}
            </p>
          ) : null}
          {emailState.kind === "error" && emailState.message ? (
            <p className="admin-settings-error" role="alert">
              {emailState.message}
            </p>
          ) : null}
          <div className="admin-settings-grid">
            <div className="admin-form-field">
              <Label htmlFor="current-email-display">Email saat ini</Label>
              <Input
                autoComplete="email"
                disabled
                id="current-email-display"
                value={currentEmail}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor="new_email" required>
                Email baru
              </Label>
              <Input
                autoComplete="email"
                error={emailState.fieldErrors.new_email}
                id="new_email"
                maxLength={254}
                name="new_email"
                required
                type="email"
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor="email-current_password" required>
                Kata sandi saat ini
              </Label>
              <Input
                autoComplete="current-password"
                error={emailState.fieldErrors.current_password}
                id="email-current_password"
                name="current_password"
                required
                type="password"
              />
              <p className="admin-field-help">
                Kata sandi saat ini wajib diisi sebagai verifikasi sebelum
                email diubah.
              </p>
            </div>
          </div>
        </fieldset>
        <div className="admin-settings-actions">
          <Button disabled={emailPending} type="submit">
            Ubah email
          </Button>
        </div>
      </form>

      <form
        action={passwordAction}
        aria-busy={passwordPending}
        className="admin-settings-form"
      >
        <fieldset className="admin-settings-group">
          <legend>Ubah kata sandi</legend>
          {passwordState.kind === "success" && passwordState.message ? (
            <p className="admin-settings-success" role="status">
              {passwordState.message}
            </p>
          ) : null}
          {passwordState.kind === "error" && passwordState.message ? (
            <p className="admin-settings-error" role="alert">
              {passwordState.message}
            </p>
          ) : null}
          <div className="admin-settings-grid">
            <div className="admin-form-field">
              <Label htmlFor="password-current_password" required>
                Kata sandi saat ini
              </Label>
              <Input
                autoComplete="current-password"
                error={passwordState.fieldErrors.current_password}
                id="password-current_password"
                name="current_password"
                required
                type="password"
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor="new_password" required>
                Kata sandi baru
              </Label>
              <Input
                autoComplete="new-password"
                error={passwordState.fieldErrors.new_password}
                id="new_password"
                maxLength={128}
                minLength={8}
                name="new_password"
                required
                type="password"
              />
              <p className="admin-field-help">Minimal 8 karakter.</p>
            </div>
            <div className="admin-form-field">
              <Label htmlFor="confirm_password" required>
                Konfirmasi kata sandi baru
              </Label>
              <Input
                autoComplete="new-password"
                error={passwordState.fieldErrors.confirm_password}
                id="confirm_password"
                name="confirm_password"
                required
                type="password"
              />
            </div>
          </div>
        </fieldset>
        <div className="admin-settings-actions">
          <Button disabled={passwordPending} type="submit">
            Ubah kata sandi
          </Button>
        </div>
      </form>
    </>
  );
}
