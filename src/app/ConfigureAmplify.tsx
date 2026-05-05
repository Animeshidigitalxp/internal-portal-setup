'use client';

import awsmobile from '@/src/aws-exports';
import { Amplify } from 'aws-amplify';
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import configData from '../../config.json';

const config = {
	...awsmobile,
	oauth: {
		...awsmobile.oauth,
		redirectSignIn: `${configData.domain}/`,
		redirectSignOut: `${configData.domain}/login/`,
		responseType: 'code',
	},
};

Amplify.configure(config, {
	ssr: true,
});

export default function ConfigureAmplify({
	children,
}: {
	children: React.ReactNode;
}) {
	// FIX Bug 1: window.location was previously evaluated at module scope,
	// which crashes during SSR. Moved inside the component body so it only
	// runs in the browser. Also switched to .hostname (cleaner than .href.includes).
	const domainLink =
		typeof window !== 'undefined' && window.location.hostname === 'localhost'
			? 'localhost'
			: configData.domain.split('//')[1];

	cognitoUserPoolsTokenProvider.setKeyValueStorage(
		new CookieStorage({
			domain: domainLink,
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			expires: 365,
		}),
	);

	return children;
}