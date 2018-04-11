import React from 'react'

const Message = ({message}) => {
    let rowFormat = "row message "
    rowFormat += message.read? "read " : "unread "
    rowFormat += message.selected === true? "checked " : ""

    return (
        <div className={rowFormat}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input
                            name="selectCheckbox"
                            value={message.id}
                            type="checkbox"
                            onchange={(e) => {console.log(`Clicked! - e.target.value: ${e.target.value}`)}}
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Message