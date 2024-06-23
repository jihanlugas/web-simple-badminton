import { NextPage } from "next/types";
import Modal from "@/components/modal/modal";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { GameSetting } from "@/types/game";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextField from "@/components/formik/text-field";
import ButtonSubmit from "@/components/formik/button-submit";
import { MdClose } from "react-icons/md";

type Props = {
  show: boolean;
  onClickOverlay: Function;
}

const schema = Yup.object().shape({
  normalGamePrice: Yup.number().typeError("Must be a number").min(0).required('Required field'),
  rubberGamePrice: Yup.number().typeError("Must be a number").min(0).required('Required field'),
  ballPrice: Yup.number().typeError("Must be a number").min(0).required('Required field'),
});

const ModalGameSetting: NextPage<Props> = ({ show, onClickOverlay }) => {

  const [init, setInit] = useState<GameSetting>({ normalGamePrice: 0, rubberGamePrice: 0, ballPrice: 0 })

  useEffect(() => {
    if (show) {
      localStorage.getItem('game-setting') && setInit(JSON.parse(localStorage.getItem('game-setting')))
    }
  }, [show])

  const handleSubmit = (values: FormikValues, formikHelpers: FormikHelpers<GameSetting>) => {
    localStorage.setItem('game-setting', JSON.stringify(values))
    formikHelpers.resetForm()
    onClickOverlay(true)
  }
  return (
    <>
      <Modal show={show} onClickOverlay={onClickOverlay} layout={'sm:max-w-lg'}>
        <div className="p-4">
          <div className={'text-xl mb-4 flex justify-between items-center'}>
            <div>{'Game Settings '}</div>
            <button type={'button'} className={'text-rose-500 disabled:bg-gray-400 font-bold rounded-full size-8 flex justify-center items-center'} onClick={() => onClickOverlay()}>
              <MdClose className='' size={'1.5rem'} />
            </button>
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
                        label={'Normal game price'}
                        name={'normalGamePrice'}
                        type={'text'}
                        inputMode={'numeric'}
                        placeholder={'Normal game price'}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <TextField
                        label={'Rubber game price'}
                        name={'rubberGamePrice'}
                        type={'text'}
                        inputMode={'numeric'}
                        placeholder={'Rubber game price'}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <TextField
                        label={'Ball price'}
                        name={'ballPrice'}
                        type={'text'}
                        inputMode={'numeric'}
                        placeholder={'Ball Price'}
                        required
                      />
                    </div>
                    <div className=''>
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

export default ModalGameSetting