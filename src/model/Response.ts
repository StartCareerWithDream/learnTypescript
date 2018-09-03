import Entity from "./Entity";

class Response extends Entity{
    code: number = 0
    message: string = ''
    result: any = null
}

export default Response;