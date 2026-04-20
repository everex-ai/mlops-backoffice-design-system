/**
 * Example: Login Page Usage
 *
 * Shows how to use the canonical LoginPage component from layout/.
 * Each service customizes via props — the layout itself stays identical.
 */
'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyServiceLoginPage;
const LoginPage_1 = __importDefault(require("@/components/layout/LoginPage"));
const ThemeToggle_1 = require("@/components/layout/ThemeToggle");
// [CUSTOMIZE] Import your Firebase auth setup
// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '@/lib/firebase';
// import { loginWithGoogle, setAuthToken, setUserData } from '@/lib/api';
function MyServiceLoginPage() {
    const handleGoogleLogin = async () => {
        // [CUSTOMIZE] Replace with your Firebase OAuth flow:
        //
        // const result = await signInWithPopup(auth, googleProvider);
        // const idToken = await result.user.getIdToken();
        // const loginResponse = await loginWithGoogle(idToken);
        // await setAuthToken(loginResponse.accessToken, loginResponse.refreshToken);
        // setUserData(loginResponse.bindingDataSet);
        // router.push('/');
        //
        // For demo, simulate a delay:
        await new Promise((resolve) => setTimeout(resolve, 1500));
    };
    return (<LoginPage_1.default 
    // [CUSTOMIZE] These 2 props are the only things that differ between services
    serviceName="AI Crawler" serviceDescription="AI 기반 웹 크롤링 및 데이터 수집 시스템" onGoogleLogin={handleGoogleLogin} headerActions={<ThemeToggle_1.ThemeToggle />}/>);
}
