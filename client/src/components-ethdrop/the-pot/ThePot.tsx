
import React, { ReactElement } from "react";

interface Foobject2 {
    foo?: string
}

export function ThePot(props: Foobject2): ReactElement {

    const name = props.foo ? props.foo : 'nothing'

    return <h1>This is {name}!</h1>

}
