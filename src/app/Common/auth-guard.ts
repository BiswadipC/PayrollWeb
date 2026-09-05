import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) =>
{
  const authService = inject(AuthService);
  const router = inject(Router);

  try
  {
    const isLoggedIn = await firstValueFrom(authService.IsLoggedIn());
    if(isLoggedIn)
    {
      const routeData = route.data["PolicyData"]
      if(routeData == undefined)
      {
        return true;
      }

      const userClaims = await firstValueFrom(authService.GetUserClaims());
      if(userClaims.some(x => x.PolicyName == routeData.type && x.PermissionType == routeData.value))
      {
        return true;
      }

      return router.createUrlTree(['/UnAuthorized']);
    } // if logged in...
    else
    {
      return router.createUrlTree(['/**']);
    } // end if...
  } // end of try...
  catch(e)
  {
    console.error('Auth Guard Error:', e);
    return router.createUrlTree(['/**']);
  } // end of catch...
};
