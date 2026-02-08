'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api, type ApiError } from '@/lib/api/api';
import { Input, PasswordInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface __Name__FormProps {
  onSuccess?: () => void;
}

const create__Name__Schema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('__module__.validation.email_invalid')),
    password: z.string().min(8, t('__module__.validation.password_min')),
  });

type __Name__FormValues = z.infer<ReturnType<typeof create__Name__Schema>>;

/**
 * Standard Form Component Template
 */
export function __Name__Form({ onSuccess }: __Name__FormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const { t } = useTranslation();

  const schema = create__Name__Schema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<__Name__FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: __Name__FormValues) => {
    setServerError(null);
    try {
      // await api.__module__.__method__(data);
      onSuccess?.();
    } catch (error) {
      const apiError = error as ApiError;
      setServerError(
        apiError.body?.error || apiError.message || t('__module__.errors.generic_failure'),
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 surface-panel"
      data-testid="__name__-form"
    >
      {serverError && (
        <div
          className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg"
          data-testid="form-server-error"
        >
          {serverError}
        </div>
      )}

      <Input
        label={t('__module__.fields.email')}
        type="email"
        {...register('email')}
        error={errors.email?.message}
        data-testid="__name__-email-input"
      />

      <Input
        label={t('__module__.fields.password')}
        type="password"
        {...register('password')}
        error={errors.password?.message}
        data-testid="__name__-password-input"
      />

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full"
        data-testid="__name__-submit-btn"
      >
        {t('__module__.actions.submit')}
      </Button>
    </form>
  );
}