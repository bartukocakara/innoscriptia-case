import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormSettings from '../../../../components/Form/Settings';
import { useNavigate, useParams } from 'react-router-dom';
import { loadShowAction } from '../../../../store/actions/DataShowAction';
import Spinner from '../../../../components/SpinnerText' 
import useSettings from '../../../../hooks/useSettings';

const Settings = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    let url = `users/${id}/preferences`
    const { buttonDisabled, settings, setSettings, handleSubmit, handleChange } = useSettings({
        dispatch: dispatch,
        url: url,
        settingFieldKey: 'player_match_setting_fields'
    });


    const [loading, setLoading] = useState(true);

    const data  = useSelector(state => state.dataShow.dataShow);
    const navigate = useNavigate()
   
    useEffect(() => {
        dispatch(loadShowAction(url, null, navigate));
        setTimeout(() => {
            setLoading(false)
        }, 1500);

    }, [dispatch, url, navigate])

    useEffect(() => {
        if (data && data.result?.data) {
            setLoading(false)
            setSettings(data.result?.data);
        }
    }, [data, setSettings]);

    return (
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            { settings.length > 0 ? <FormSettings data={settings} 
                                       loading={loading}
                                       buttonDisabled={buttonDisabled}
                                       handleChange={handleChange}
                                       handleSubmit={handleSubmit}
                                       t={t} /> : (
                            <Spinner t={t} />
                          )
            }
        </div>

    )
}

export default Settings