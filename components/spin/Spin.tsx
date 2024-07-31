import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);

export default function Spin() {
    return (
        <div className={"spin"}>
            <FontAwesomeIcon icon="spinner" spin />
        </div>
    )
}
