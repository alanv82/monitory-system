
interface CheckServiceUseCase {
  execute( url:string ):Promise<boolean>;
}
type SuccesCallback = () => void;
type ErrorCallback = ( error:string ) => void;

export class CheckService implements CheckServiceUseCase{

  constructor(

    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback

  ){}

  public async execute( url:string ){

    try {
      const request = await fetch(url);
      if (!request.ok){
        throw new Error (`Error on service ${url}`)
      }
      this.succesCallback();
      return true
    } catch (error) {
      this.errorCallback(`${error}`);
      return false
    }
  }
}