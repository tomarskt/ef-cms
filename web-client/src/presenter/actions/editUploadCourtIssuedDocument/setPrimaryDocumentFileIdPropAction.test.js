import { presenter } from '../../presenter';
import { runAction } from 'cerebral/test';
import { setPrimaryDocumentFileIdPropAction } from './setPrimaryDocumentFileIdPropAction';

describe('setPrimaryDocumentFileIdPropAction', () => {
  it('should update the props from state', async () => {
    const result = await runAction(setPrimaryDocumentFileIdPropAction, {
      modules: { presenter },
      state: { form: { documentId: '123' } },
    });

    expect(result.output.primaryDocumentFileId).toEqual('123');
  });
});
