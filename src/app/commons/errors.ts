
export class Errors {
    
    data: any = {};
    hasErrors = false;
    
	
    
    setErrors(values: string = "") {
        
        try
        {
           this.data = JSON.parse(values);
        }
        catch(e)
        {
           this.data['_general'] = values;
        }
        

        this.hasErrors = true;
    }
    
    getGeneralsError() {
        if(this.data['_generals'] === undefined) {
            return [];
        } else { 
            return [this.data['_generals']];
        }
    }
    
    getErrors(item: string): string[] {        
        if(this.data[item] === undefined) {
            return [];
        } else {
            let errors: string[] = [];
            
            for(let line in this.data[item]) {
                errors.push(this.data[item][line]);
            }
            
            return errors;
        }
    }  
}
