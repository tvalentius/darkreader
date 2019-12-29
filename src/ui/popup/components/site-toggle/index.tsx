import {m} from 'malevic';
import CheckmarkIcon from './checkmark-icon';
import {Button} from '../../../controls';
import {getURLHost, isURLEnabled} from '../../../../utils/url';
import {ExtWrapper, TabInfo} from '../../../../definitions';

export default function SiteToggleButton({data, tab, actions}: ExtWrapper & {tab: TabInfo}) {
    const toggleHasEffect = (
        data.isEnabled &&
        !tab.isProtected
    );
    const isSiteEnabled = isURLEnabled(tab.url, data.settings, tab);
    const host = getURLHost(tab.url || '');

    const urlText = (host
        ? host
            .split('.')
            .reduce((elements, part, i) => elements.concat(
                <wbr />,
                `${i > 0 ? '.' : ''}${part}`
            ), [])
        : 'current site');

    return (
        <Button
            class={{
                'site-toggle': true,
                'site-toggle--active': isSiteEnabled,
                'site-toggle--disabled': !toggleHasEffect
            }}
            onclick={() => actions.toggleURL(tab.url)}
        >
            <span class="site-toggle__mark"><CheckmarkIcon isEnabled={isSiteEnabled} /></span>
            {' '}
            <span class="site-toggle__url" >{urlText}</span>
        </Button>
    );
}
