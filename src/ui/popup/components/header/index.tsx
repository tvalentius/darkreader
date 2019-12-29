import {m} from 'malevic';
import SiteToggle from '../site-toggle';
import MoreToggleSettings from './more-toggle-settings';
import WatchIcon from './watch-icon';
import SunMoonIcon from './sun-moon-icon';
import SystemIcon from './system-icon';
import {Shortcut, Toggle} from '../../../controls';
import {getLocalMessage} from '../../../../utils/locales';
import {ExtWrapper, TabInfo} from '../../../../definitions';

function multiline(...lines: string[]) {
    return lines.join('\n');
}

type HeaderProps = ExtWrapper & {
    tab: TabInfo;
    onMoreToggleSettingsClick: () => void;
};

function Header({data, actions, tab, onMoreToggleSettingsClick}: HeaderProps) {

    function toggleExtension(enabled) {
        actions.changeSettings({
            enabled,
            automation: '',
        });
    }

    const isAutomation = Boolean(data.settings.automation);
    const isTimeAutomation = data.settings.automation === 'time';
    const isLocationAutomation = data.settings.automation === 'location';
    const now = new Date();

    return (
        <header class="header">
            <img class="header__logo" src="../assets/images/darkreader-type.svg" alt="Dark Reader" />
            <div class="header__control header__site-toggle">
                <SiteToggle
                    data={data}
                    tab={tab}
                    actions={actions}
                />
                {tab.isProtected ? (
                    <span class="header__site-toggle__unable-text">
                        {getLocalMessage('page_protected')}
                    </span>
                ) : tab.isInDarkList ? (
                    <span class="header__site-toggle__unable-text">
                        {getLocalMessage('page_in_dark_list')}
                    </span>
                ) : (
                    <Shortcut
                        commandName="addSite"
                        shortcuts={data.shortcuts}
                        textTemplate={(hotkey) => (hotkey
                            ? multiline(getLocalMessage('toggle_current_site'), hotkey)
                            : getLocalMessage('setup_hotkey_toggle_site')
                        )}
                        onSetShortcut={(shortcut) => actions.setShortcut('addSite', shortcut)}
                    />
                )}
            </div>
            <div class="header__control header__app-toggle">
                <Toggle checked={data.isEnabled} labelOn={getLocalMessage('on')} labelOff={getLocalMessage('off')} onChange={toggleExtension} />
                <Shortcut
                    commandName="toggle"
                    shortcuts={data.shortcuts}
                    textTemplate={(hotkey) => (hotkey
                        ? multiline(getLocalMessage('toggle_extension'), hotkey)
                        : getLocalMessage('setup_hotkey_toggle_extension')
                    )}
                    onSetShortcut={(shortcut) => actions.setShortcut('toggle', shortcut)}
                />
                <span
                    class="header__app-toggle__more-button"
                    onclick={onMoreToggleSettingsClick}
                ></span>
                <span
                    class={{
                        'header__app-toggle__time': true,
                        'header__app-toggle__time--active': isAutomation,
                    }}
                >
                    {(isTimeAutomation
                        ? <WatchIcon hours={now.getHours()} minutes={now.getMinutes()} />
                        : (isLocationAutomation
                            ? (<SunMoonIcon date={now} latitude={data.settings.location.latitude} longitude={data.settings.location.longitude} />)
                            : <SystemIcon />))}
                </span>
            </div>
        </header>
    );
}

export {
    Header,
    MoreToggleSettings, // TODO: Implement portals to place elements into <body>.
};
