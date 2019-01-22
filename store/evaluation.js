import goodDayBadDay from '../utlities/goodDayBadDay'

const GOOD_BAD_EVALUATED = 'GOOD_BAD_EVALUATED'

const goodBadEvaluated = (evaluation) => {

  return {
    action: GOOD_BAD_EVALUATED,
    evaluation,
  }
}

export const evaluateGoodBad = () => {
  return (dispatch, getState) => {
    const { weather, settings, } = getState()

    const condition = goodDayBadDay(weather, settings)

    dispatch(goodBadEvaluated(condition))

  }
}

export default function(state = false, action) {
  switch (action.type) {
    case GOOD_BAD_EVALUATED:
      return action.evaluation
    default:
      return state
  }
}
