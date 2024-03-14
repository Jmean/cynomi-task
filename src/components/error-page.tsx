import { useRouteError } from "react-router-dom";

export default function ErrorPage() {

    const error = useRouteError();
    return (
        <ErrorMessage 
            errorText={(error as {statusText?: string}).statusText || (error as Error).message} 
        />
      );
}


export function ErrorMessage({errorText = "Error"} : {errorText: string}) {
  return (
    <div>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{errorText}</i>
          </p>
      </div>
  )
}