
import { Button } from '@/components/ui/button';
import React from 'react'
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import { redirect } from "next/navigation";
import { AuthStatus } from "@civic/auth-web3";


export default function ConnectBtn() {
    const userContext = useUser();
      const { authStatus, signIn } = useUser();
      const connected = authStatus === AuthStatus.AUTHENTICATED;
    
      const handleConnect = React.useCallback(async () => {
        const afterLogin = async () => {
          if (userContext.user && !userHasWallet(userContext)) {
            await userContext.createWallet();
          }
        };
        await signIn()
          .then(afterLogin)
          .then(() => redirect("/dashboard"));
      }, [signIn, userContext]);
    
    return (
      <Button
        variant={"default"}
        size="sm"
        onClick={handleConnect}
        // disabled={authStatus === AuthStatus.AUTHENTICATING ? false : true}
      >
        {connected ? "Connecting..." : "Connect"}
      </Button>
    );
}
