"use client";

import { useActionState } from "react";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { Button } from "@/components/tailadmin/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/tailadmin/ui/field";
import { Input } from "@/components/tailadmin/ui/input";
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
      <form action={emailAction} aria-busy={emailPending} className="space-y-6">
        <ComponentCard title="Ubah email login">
          {emailState.kind === "success" && emailState.message ? (
            <Alert role="status" variant="success">
              <AlertDescription>{emailState.message}</AlertDescription>
            </Alert>
          ) : null}
          {emailState.kind === "error" && emailState.message ? (
            <Alert role="alert" variant="destructive">
              <AlertDescription>{emailState.message}</AlertDescription>
            </Alert>
          ) : null}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="current-email-display">
                Email saat ini
              </FieldLabel>
              <Input
                autoComplete="email"
                disabled
                id="current-email-display"
                value={currentEmail}
              />
            </Field>
            <Field data-invalid={Boolean(emailState.fieldErrors.new_email)}>
              <FieldLabel htmlFor="new_email">
                Email baru <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                aria-invalid={
                  emailState.fieldErrors.new_email ? true : undefined
                }
                autoComplete="email"
                id="new_email"
                maxLength={254}
                name="new_email"
                required
                type="email"
              />
              <FieldError
                errors={
                  emailState.fieldErrors.new_email
                    ? [{ message: emailState.fieldErrors.new_email }]
                    : undefined
                }
              />
            </Field>
            <Field
              data-invalid={Boolean(emailState.fieldErrors.current_password)}
            >
              <FieldLabel htmlFor="email-current_password">
                Kata sandi saat ini <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                aria-invalid={
                  emailState.fieldErrors.current_password ? true : undefined
                }
                autoComplete="current-password"
                id="email-current_password"
                name="current_password"
                required
                type="password"
              />
              <FieldError
                errors={
                  emailState.fieldErrors.current_password
                    ? [{ message: emailState.fieldErrors.current_password }]
                    : undefined
                }
              />
              <FieldDescription>
                Kata sandi saat ini wajib diisi sebagai verifikasi sebelum
                email diubah.
              </FieldDescription>
            </Field>
          </div>
        </ComponentCard>
        <div className="flex justify-end">
          <Button disabled={emailPending} type="submit">
            Ubah email
          </Button>
        </div>
      </form>

      <form
        action={passwordAction}
        aria-busy={passwordPending}
        className="space-y-6"
      >
        <ComponentCard title="Ubah kata sandi">
          {passwordState.kind === "success" && passwordState.message ? (
            <Alert role="status" variant="success">
              <AlertDescription>{passwordState.message}</AlertDescription>
            </Alert>
          ) : null}
          {passwordState.kind === "error" && passwordState.message ? (
            <Alert role="alert" variant="destructive">
              <AlertDescription>{passwordState.message}</AlertDescription>
            </Alert>
          ) : null}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              data-invalid={Boolean(
                passwordState.fieldErrors.current_password,
              )}
            >
              <FieldLabel htmlFor="password-current_password">
                Kata sandi saat ini <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                aria-invalid={
                  passwordState.fieldErrors.current_password ? true : undefined
                }
                autoComplete="current-password"
                id="password-current_password"
                name="current_password"
                required
                type="password"
              />
              <FieldError
                errors={
                  passwordState.fieldErrors.current_password
                    ? [
                        {
                          message:
                            passwordState.fieldErrors.current_password,
                        },
                      ]
                    : undefined
                }
              />
            </Field>
            <Field
              data-invalid={Boolean(passwordState.fieldErrors.new_password)}
            >
              <FieldLabel htmlFor="new_password">
                Kata sandi baru <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                aria-invalid={
                  passwordState.fieldErrors.new_password ? true : undefined
                }
                autoComplete="new-password"
                id="new_password"
                maxLength={128}
                minLength={8}
                name="new_password"
                required
                type="password"
              />
              <FieldError
                errors={
                  passwordState.fieldErrors.new_password
                    ? [{ message: passwordState.fieldErrors.new_password }]
                    : undefined
                }
              />
              <FieldDescription>Minimal 8 karakter.</FieldDescription>
            </Field>
            <Field
              data-invalid={Boolean(
                passwordState.fieldErrors.confirm_password,
              )}
            >
              <FieldLabel htmlFor="confirm_password">
                Konfirmasi kata sandi baru{" "}
                <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                aria-invalid={
                  passwordState.fieldErrors.confirm_password ? true : undefined
                }
                autoComplete="new-password"
                id="confirm_password"
                name="confirm_password"
                required
                type="password"
              />
              <FieldError
                errors={
                  passwordState.fieldErrors.confirm_password
                    ? [{ message: passwordState.fieldErrors.confirm_password }]
                    : undefined
                }
              />
            </Field>
          </div>
        </ComponentCard>
        <div className="flex justify-end">
          <Button disabled={passwordPending} type="submit">
            Ubah kata sandi
          </Button>
        </div>
      </form>
    </>
  );
}
