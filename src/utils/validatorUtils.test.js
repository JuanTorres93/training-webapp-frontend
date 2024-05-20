import * as vu from './validatorUtils';

describe('validateIntegerId', () => {
    const defaultErrorMsg = "Not valid id";

    it('processes correctly integer ids', () => {
        const id = 3;
        const validatedId = vu.validateIntegerId(id);

        expect(validatedId).toStrictEqual(id);
    })

    it('warns about not valid id when using string as id', () => {
        const id = 'JS injection';
        const validatedId = vu.validateIntegerId(id);

        expect(validatedId).toStrictEqual(defaultErrorMsg);

    })

    it('processes correctly integer ids represented by strings', () => {
        const id = '1';
        const validatedId = vu.validateIntegerId(id);

        expect(validatedId).toStrictEqual(1);

    })
})