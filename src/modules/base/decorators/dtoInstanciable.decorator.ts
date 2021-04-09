/**
    @Decorator Instanciable
    Use Instanciable decorator to create instances of nested dtos in a dto definition
    @example:
    @Instanciable(ExampleDto.Instanciables)
    export class ExampleDto extends BaseDto<ExampleModel>{
        ...dto definition

        @ValidateNested(ALWAYS)
        sharedInHistory: SeePostDto

        static Instanciables = {
            instanciableProperty: () => DtoClassName,
            ex: sharedInHistory: () => SeePostDto,
            
            instanciableArrayProperty: () => [DtoClassName],
            ex: images: () => [ImageDto],
        }
    }
*/

export const Instanciable = (values: object) => {
    return function <T extends { new(...args: any[]): {} }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                const data = args[0]
                const keys = Object.keys(values)
                let constructor;

                for (const key of keys) {
                    const constr = values[key]()

                    if (Array.isArray(constr)) {
                        constructor = constr[0]
                        data[key] = createMultipleInstances(data[key], constructor)
                    }
                    else {
                        constructor = constr
                        data[key] = createInstance(data[key], constructor)
                    }
                }
                super(...args)
            }
        }
    }
}


const createInstance = (value, constructor) => {
    if (value !== null && value !== undefined) {
        const instance = new constructor()
        Object.assign(instance, value)
        return instance
    }
}

const createMultipleInstances = (values: any[], constructor) => {
    const instances = []
    for (const value of values) {
        instances.push(createInstance(value, constructor))
    }
    return instances
}
