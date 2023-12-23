export const depHUserList = state => state.depHeadUser.userList
export const depHUserListPages = state => state.depHeadUser.totalPage
export const depHInteractingUser = state => state.depHeadUser.interactingUserId

export const depHFieldList = state => state.depHeadField.fieldList
export const depHFieldListPages = state => state.depHeadField.totalPage

export const depHAnswerList = state => state.depHeadAnswer.answerList
export const depHAnswerListPages = state => state.depHeadAnswer.totalPage
export const depHInteractingAnswer = state => state.depHeadAnswer.onInteractingAnswerId

export const depHFaqList = state => state.depHeadFaq.faqList
export const depHFaqListPages = state => state.depHeadFaq.totalPage
export const depHInteractingFaq = state => state.depHeadFaq.onInteractingFaqId
