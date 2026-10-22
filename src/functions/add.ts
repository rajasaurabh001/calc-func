import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function add(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

   
    const a = request.query.get('a');
    const b = request.query.get('b');

    if(!a || !b){
        return{status:400,jsonBody:{error:"Please provide both a and b"}};
        
    }
    const numA = Number(a);
    const numB = Number(b);
    
    if(isNaN(numA) ||isNaN(numB)){
        return {status:400,jsonBody:{error:"a and b must be the number"
        }}
    }


    return { status:200,jsonBody: {a:numA,b:numB,sum:numA+numB} };
};

app.http('add', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: add
});
