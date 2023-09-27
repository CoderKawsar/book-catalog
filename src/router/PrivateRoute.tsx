import { ReactNode } from "react";
import Cookies from "js-cookie";


function PrivateRoute({ children }: { children: ReactNode }) {
    const token: string = Cookies.get('book-catalog-access-token') as string;

    const decodedToken = jwt.verify(token, secretKey);
  return <div>{children}</div>;
}

export default PrivateRoute;
