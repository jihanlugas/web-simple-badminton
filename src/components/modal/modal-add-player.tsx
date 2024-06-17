import { NextPage } from "next/types";
import Modal from "@/components/modal/modal";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { GameSetting, Player } from "@/types/game";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextField from "@/components/formik/text-field";
import ButtonSubmit from "@/components/formik/button-submit";
import notif from "@/utils/notif";

type Props = {
  show: boolean;
  onClickOverlay: Function;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Required field'),
});

const ModalAddPlayer: NextPage<Props> = ({ show, onClickOverlay }) => {

  const [closeDialog, setCloseDialog] = useState(true)

  const init: Player = {
    name: '',
    normalGame: 0,
    rubberGame: 0,
    ball: 0,
    paid: false
  }

  const handleSubmit = (values: FormikValues, formikHelpers: FormikHelpers<Player>) => {
    const players: Player[] = localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : []
    players.push(values as Player)
    players.sort((a, b) => a.name.localeCompare(b.name))
    localStorage.setItem('players', JSON.stringify(players))
    formikHelpers.resetForm()
    if (closeDialog) {
      onClickOverlay()
    }
    notif.success('Player added successfully')
  }
  return (
    <>
      <Modal show={show} onClickOverlay={onClickOverlay} layout={'sm:max-w-lg'}>
        <div className="p-4">
          <div className={'text-xl mb-4'}>
            {'Add Player'}
          </div>
          <div>
            <Formik
              initialValues={init}
              validationSchema={schema}
              enableReinitialize={true}
              onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
            >
              {({ values, errors, touched, setValues, setFieldValue }) => {
                return (
                  <Form encType='multipart/form-data'>
                    <div className='mb-4'>
                      <TextField
                        label={'Player name'}
                        name={'name'}
                        type={'text'}
                        placeholder={'Player name'}
                        required
                      />
                    </div>
                    <div className="flex justify-end items-center mb-4">
                      <div>
                        <label className={'select-none w-full py-2 flex items-center justify-end'} >
                          <span className='truncate'>{"Close dialog on save"}</span>
                          <input
                            className={'ml-4 mr-1 accent-primary-600 py-2 scale-150'}
                            type={"checkbox"}
                            checked={closeDialog}
                            onChange={() => setCloseDialog(!closeDialog)}
                          />
                        </label>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <ButtonSubmit
                        label={'Save'}
                      />
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalAddPlayer