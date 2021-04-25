import { handleSubmit, saveBtnHandler } from './js/formHandler'
import { updateUI } from './js/updateUI'
import { checkDate, daysBetween } from './js/utils'
import { loadSaved, savedTripsElm, getData } from './js/loadSaved'
import './media/travel.png'
import './media/travelbg.jpg'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/card.scss'
import './styles/typography.scss'

export {
    handleSubmit,
    updateUI,
    checkDate,
    daysBetween,
    saveBtnHandler,
    loadSaved,
    savedTripsElm,
    getData
}