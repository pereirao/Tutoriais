// @flow
import {combineLatest, take} from "rxjs/operators"

const replaySkipUntil = (emit_flag$: any) => (source$: any) => {
  // we take only the first value of emit flag. After it's emitted once, we don't care about it anymore and
  // we don't want it to make the return observable emit.
  const should_emit$ = emit_flag$.pipe(take(1));

  // we combineLatest with the should_emit$ flag, returning only the value in source$.
  // Since should_emit$ only emits once, this should behave like a skipUntil or withLatestFrom, with source$ being the only thing triggers emissions.

  // Except, in the case that should_emit$ fires for the first time AFTER source$ has fired,
  // should_emit$ will trigger an emission (which will be the most recent value on source$),
  // as combineLatest$ emits whenever one of its arguments does.

  // Essentially, this gives us a skipUntil that buffers the most recent value from source$ in the case that emit_flag$ fires the first time after soure$ does.
  return source$.pipe(combineLatest(should_emit$, (source_val, _emit_flag) => source_val));
};

export default replaySkipUntil;
