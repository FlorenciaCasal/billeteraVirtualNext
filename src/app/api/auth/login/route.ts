import { LoginFinalScheme } from './../../../../schemes/LoginFinal.scheme';
import { NextResponse, type NextRequest } from "next/server";
import { AccessDeniedError } from '@/services/common/http.errors';
import authService from '@/services/auth/auth.services';
import { cookies } from 'next/headers'



export async function POST(request: NextRequest) {
    const { email, password } = await LoginFinalScheme.validate(await request.json());
    const cookieStore = cookies();
    const account_id = cookieStore.get('digitalMoneyAccountID')?.value;

    try {
        const loginResponse = await authService.authenticate(email, password)


        cookies().set('digitalMoneyID', loginResponse.sessionId, {
            expires: loginResponse.expireAt,
            httpOnly: true,
            secure: true,
            // domain: process.env.NEXT_PUBLIC_API_URL,
            path: '/'
        })

        cookies().set('digitalMoneyEmail', email, {
            expires: loginResponse.expireAt,
            httpOnly: false,
            secure: true,
            // domain: process.env.NEXT_PUBLIC_API_URL,
            path: '/'
        })

        // Establecer la cookie en el servidor 
        if (account_id) {
            cookies().set('digitalMoneyAccountID', account_id.toString(), {
                httpOnly: false,
                secure: true,
              //  domain: process.env.NEXT_PUBLIC_API_URL,
                path: '/',
            });
        } else {
            // Manejar el caso donde no se puede obtener accountId
            console.error('No se pudo obtener accountId');
        }


        return new Response(JSON.stringify({
            token: loginResponse.sessionId,
            user: {
                email,
                account_id,
            },
        }), {
            status: 200,
        });

    } catch (e) {
        if (e instanceof AccessDeniedError) {
            return NextResponse.json({
                error: 'Invalid credentials for user',
            }, {
                status: 401,
            });
        } else {
            return NextResponse.json({
                error: 'Internal server error',
                message: e instanceof Error ? e.message : 'Unknown error',
            }, {
                status: 500,
            });
        }
    }
}
// import { LoginFinalScheme } from './../../../../schemes/LoginFinal.scheme';
// import { NextResponse, type NextRequest } from "next/server";
// import { AccessDeniedError } from '@/services/common/http.errors';
// import authService from '@/services/auth/auth.services';
// import { cookies } from 'next/headers'



// export async function POST(request: NextRequest) {
//     const { email, password } = await LoginFinalScheme.validate(await request.json());
//     const cookieStore = cookies();
//     const account_id = cookieStore.get('digitalMoneyAccountID')?.value;

//     try {
//         const loginResponse = await authService.authenticate(email, password)


//         cookies().set('digitalMoneyID', loginResponse.sessionId, {
//             expires: loginResponse.expireAt,
//             httpOnly: true,
//             secure: true,
//             domain: 'localhost',
//             path: '/'
//         })

//         cookies().set('digitalMoneyEmail', email, {
//             expires: loginResponse.expireAt,
//             httpOnly: false,
//             secure: true,
//             domain: 'localhost',
//             path: '/'
//         })

//         // Establecer la cookie en el servidor 
//         if (account_id) {
//             cookies().set('digitalMoneyAccountID', account_id.toString(), {
//                 httpOnly: false,
//                 secure: true,
//                 domain: 'localhost',
//                 path: '/',
//             });
//         } else {
//             // Manejar el caso donde no se puede obtener accountId
//             console.error('No se pudo obtener accountId');
//         }


//         return new Response(JSON.stringify({
//             token: loginResponse.sessionId,
//             user: {
//                 email,
//                 account_id,
//             },
//         }), {
//             status: 200,
//         });

//     } catch (e) {
//         if (e instanceof AccessDeniedError) {
//             return NextResponse.json({
//                 error: 'Invalid credentials for user',
//             }, {
//                 status: 401,
//             });
//         } else {
//             return NextResponse.json({
//                 error: 'Internal server error',
//                 message: e instanceof Error ? e.message : 'Unknown error',
//             }, {
//                 status: 500,
//             });
//         }
//     }
// }