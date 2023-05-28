import moment from 'moment';
import { serverTimeFormat } from '@minibar/store-business/src/__tests__/utils/date';
import {
  commentNote,
  commentAttribution,
  isFromMinibar,
  formattedAuthor,
  commentTimelineEntries,
  sentToCustomer,
  trimNotePrefix,
  SENT_TO_CUSTOMER_PREFIX
} from '../helpers';
import comment_factory from './comment.factory';

describe('commentNote', () => {
  const comment = comment_factory.build({note: 'Rapper bug zapper'});
  it('returns note from comment', () => {
    expect(commentNote(comment)).toEqual('Rapper bug zapper');
  });
});

describe('commentAttribution', () => {
  it('returns comment attribution for cx comment', () => {
    const author = {name: 'Brian Cooper', email: 'brian@minibardelivery.com'};
    const comment = comment_factory.build({author}); // created_at === serverTimeFormat(moment('2017-01-01'))

    expect(commentAttribution(comment)).toEqual('Brian Cooper (Minibar CX) - 12:00 AM on 01/01/2017');
  });
  it('returns comment attribution for employee comment', () => {
    const author = {name: 'Bus Driver', email: 'bus@driver.com'};
    const comment = comment_factory.build({author}); // created_at === serverTimeFormat(moment('2017-01-01'))

    expect(commentAttribution(comment)).toEqual('Bus Driver (employee) - 12:00 AM on 01/01/2017');
  });
});

describe('isFromMinibar', () => {
  it('returns true if author email is minibardelivery domain', () => {
    const author = {name: 'Brian Cooper', email: 'brian@minibardelivery.com'};
    const comment = comment_factory.build({author});
    expect(isFromMinibar(comment)).toEqual(true);
  });
  it('returns false if author email is any other domain', () => {
    const author = {name: 'Hemlock Ernst', email: 'hemlock@ernst.com'};
    const comment = comment_factory.build({author});
    expect(isFromMinibar(comment)).toEqual(false);
  });
});

describe('formattedAuthor', () => {
  it('returns author name with minibar subtext for cx comment', () => {
    const author = {name: 'Brian Cooper', email: 'brian@minibardelivery.com'};
    const comment = comment_factory.build({author}); // created_at === serverTimeFormat(moment('2017-01-01'))

    expect(formattedAuthor(comment)).toEqual('Brian Cooper (Minibar CX)');
  });
  it('returns author name with employee subtext for employee comment', () => {
    const author = {name: 'Digable Planets', email: 'digable@planets.com'};
    const comment = comment_factory.build({author}); // created_at === serverTimeFormat(moment('2017-01-01'))

    expect(formattedAuthor(comment)).toEqual('Digable Planets (employee)');
  });
});

describe('commentTimelineEntries', () => {
  const author1 = {name: 'Brian Cooper', email: 'brian@minibardelivery.com'};
  const author2 = {name: 'Jay Z', email: 'jay@z.com'};
  const created_at1 = serverTimeFormat(moment('2017-01-01'));
  const created_at2 = serverTimeFormat(moment('2017-01-02'));
  const comment1 = comment_factory.build({author: author1, created_at: created_at1});
  const comment2 = comment_factory.build({author: author2, created_at: created_at2});

  it('returns array of timeline entries for', () => {
    expect(commentTimelineEntries([comment1, comment2])).toEqual([
      {time: created_at1, type: 'comment', meta: {name: 'Brian Cooper (Minibar CX)'}},
      {time: created_at2, type: 'comment', meta: {name: 'Jay Z (employee)'}}
    ]);
  });
});

describe('sentToCustomer', () => {
  it('returns true if note has sent to customer prefix', () => {
    const note = `${SENT_TO_CUSTOMER_PREFIX} Hey thanks for paying us.`;
    const comment = comment_factory.build({note});
    expect(sentToCustomer(comment)).toEqual(true);
  });
  it('returns flase if note does not have sent to customer prefix', () => {
    const note = 'This is an internal comment';
    const comment = comment_factory.build({note});
    expect(sentToCustomer(comment)).toEqual(false);
  });
});

describe('trimNotePrefix', () => {
  const note = `${SENT_TO_CUSTOMER_PREFIX} Hey thanks for paying us.`;
  const comment = comment_factory.build({note});
  it('returns note without sent to customer prefix', () => {
    expect(trimNotePrefix(comment.note)).toEqual('Hey thanks for paying us.');
  });
});
