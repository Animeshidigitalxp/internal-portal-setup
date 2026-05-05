import { type NextRequest,NextResponse } from 'next/server';
import { authenticatedUser } from './utils/amplifyServerUtils';
// import { authenticatedUser } from './utils/amplifyServerUtils';
// import configData from '../config.json'

export async function middleware(request: NextRequest) {


	const response = NextResponse.next();
	
	
	
	const url = new URL(request.url);
	const pathname = url.pathname;
	
	
	
	console.log('middleware pathname',pathname)
	const cookies = request.cookies.getAll();

	
	

	try {
		const session:any = await authenticatedUser({ request, response });
		console.log('middleware session',JSON.stringify(session))
		
		
		
        const isOnLoginPage = pathname === '/login';
		const hCheck = pathname === '/health'
		
		const isAuthenticated = session?.tokens?.idToken;
		console.log('middleware isAuthenticated',isAuthenticated, 'isOnLoginPage',isOnLoginPage,'pathname',pathname)
		 // Allow direct access to /login without session check
		

        if (!isAuthenticated) {
			if(!isOnLoginPage && !hCheck){
            	return NextResponse.redirect(new URL('/login', request.nextUrl));
			}else{
				return response;
			}
        }

		// If the user is authenticated and on /login, send them to /
        if (isAuthenticated && isOnLoginPage) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }

        return response;
		

		
	} catch (error) {
		console.error('Middleware error:', error);
	}

	
}









export const config = {
	matcher: [
		'/',
		'/login',
		'/((?!api|_next/static|_next/image|favicon.ico|public).*)',
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' },
			],
		},
	],
};
