// import authService from "@/services/auth/auth.services";
// import { NextResponse, type NextRequest } from "next/server";
// import { ConflictError } from '@/services/common/http.errors';
// import { RegisterScheme } from '@/schemes/register.scheme';


// export async function POST(request: NextRequest) {
//     const { firstname, lastname, dni, email, password, confirmPassword, phone } = await RegisterScheme.validate(await request.json());

//     try {
//         const registerResponse = await authService.register(firstname, lastname, dni, email, password, confirmPassword, phone)

//         return new Response(JSON.stringify(registerResponse), {
//             status: 200,
//         })
//     } catch (e) {
//         if (e instanceof ConflictError) {
//             return NextResponse.json({
//                 error: 'Email is already taken',
//             }, {
//                 status: 409,
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