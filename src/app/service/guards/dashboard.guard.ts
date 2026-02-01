import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if(!isLoggedIn) {
        router.navigateByUrl('/');
        return false;
    }

    return true;
}