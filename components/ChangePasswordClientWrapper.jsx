'use client';

import ChangePasswordForm from './ChangePasswordForm';

export default function ChangePasswordClientWrapper({ userId }) {
  return <ChangePasswordForm userId={userId} />;
}
