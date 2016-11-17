
export class Errors {
    
    data: any = {};
    hasErrors = false;
    
	
    
    setErrors(values: Object = {}) {
        this.data = values;
        this.hasErrors = true;
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
