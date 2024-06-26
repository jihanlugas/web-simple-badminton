import Main from "@/components/layout/main";
import ModalGameSetting from "@/components/modal/modal-game-setting";
import ModalAddPlayer from "@/components/modal/modal-add-player";
import { GameSetting, Player } from "@/types/game";
import PageWithLayoutType from "@/types/layout";
import { displayMoney, displayNumber } from "@/utils/formater";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { MdAdd, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown, MdRemove } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import CheckboxField from "@/components/formik/checkbox-field";
import ModalDelete from "@/components/modal/modal-delete";
import { array } from "yup";
import notif from "@/utils/notif";

const Game = () => {

  const [gameSetting, setGameSetting] = useState<GameSetting>({ normalGamePrice: 0, rubberGamePrice: 0, ballPrice: 0 })
  const [players, setPlayers] = useState<Player[]>([])
  const refAdd = useRef<HTMLDivElement>();
  const [addBar, setAddBar] = useState(false);
  const [showModalGameSetting, setShowModalGameSetting] = useState<boolean>(false);
  const [showModalAddPlayer, setShowModalAddPlayer] = useState<boolean>(false);
  const [showModalDeletePlayer, setShowModalDeletePlayer] = useState<boolean>(false);
  const [deletePlayer, setDeletePlayer] = useState<number>(null);
  const [accordion, setAccordion] = useState<number[]>([]);

  const toggleAccordion = (key) => {
    if (accordion.includes(key)) {
      setAccordion(accordion.filter((item) => item !== key));
    } else {
      setAccordion([...accordion, key]);
    }
  }

  let total = 0
  let totalcash = 0
  let totaltransfer = 0
  let totalunpaid = 0

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (addBar && refAdd.current && !refAdd.current.contains(e.target)) {
        setAddBar(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [addBar]);

  const handleGameSetting = (refresh: boolean = false) => {
    if (refresh) {
      setGameSetting(JSON.parse(localStorage.getItem('game-setting')))
    }
    setAddBar(false);
    setShowModalGameSetting(!showModalGameSetting)
  }

  const handleAddPlayer = () => {
    setPlayers(JSON.parse(localStorage.getItem('players') ? localStorage.getItem('players') : '[]'))
    setAddBar(false);
    setShowModalAddPlayer(!showModalAddPlayer)
    setAccordion([])
  }

  const toggleDeletePlayer = (key: number) => {
    setDeletePlayer(key);
    setShowModalDeletePlayer(!showModalDeletePlayer);
  }

  const handleDeleteGameplayer = () => {
    const newPlayers = players
    newPlayers.splice(deletePlayer, 1)
    localStorage.setItem('players', JSON.stringify(newPlayers))
    setPlayers(JSON.parse(localStorage.getItem('players')))
    toggleDeletePlayer(null)
    setAccordion([]);
    notif.success('Player deleted successfully')
  }

  const handleActionPlayer = (key: number, player: Player) => {
    const newPlayers = players
    newPlayers[key] = player
    localStorage.setItem('players', JSON.stringify(newPlayers))
    setPlayers(JSON.parse(localStorage.getItem('players')))
  }

  const handleResetData = () => {
    localStorage.clear()
    setPlayers([])
    setGameSetting({ normalGamePrice: 0, rubberGamePrice: 0, ballPrice: 0 })
    setAddBar(false);
    setAccordion([]);
  }

  useEffect(() => {
    localStorage.getItem('game-setting') && setGameSetting(JSON.parse(localStorage.getItem('game-setting')))
    localStorage.getItem('players') && setPlayers(JSON.parse(localStorage.getItem('players')))
  }, [])

  return (
    <>
      <Head>
        <title>{process.env.APP_NAME + ' | Game'}</title>
      </Head>
      <ModalGameSetting
        onClickOverlay={handleGameSetting}
        show={showModalGameSetting}
      />
      <ModalAddPlayer
        onClickOverlay={handleAddPlayer}
        show={showModalAddPlayer}
      />
      <ModalDelete
        onClickOverlay={toggleDeletePlayer}
        show={showModalDeletePlayer}
        onDelete={handleDeleteGameplayer}
      >
        <div>
          <div className='mb-4'>Are you sure to delete this player?</div>
          <div className='text-sm mb-4 text-gray-700'>Data related to thiss will also be deleted</div>
        </div>
      </ModalDelete>
      <div className='p-4'>
        <div className='bg-white mb-4 p-4 rounded shadow'>
          <div className='text-xl flex items-center justify-between'>
            <div className="font-bold">Game</div>
            <div className='text-base relative inline-block' ref={refAdd}>
              <button onClick={() => setAddBar(!addBar)} className='flex items-center hover:bg-gray-100 rounded -m-2 p-2'>
                <div className='flex justify-center items-center rounded size-8'>
                  <MdOutlineKeyboardArrowDown size={'1.5em'} />
                </div>
              </button>
              <div className={`absolute right-0 mt-2 w-56 rounded-md overflow-hidden origin-top-right shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none duration-300 ease-in-out ${!addBar && 'scale-0 shadow-none ring-0'}`}>
                <div className="" role="none">
                  <button onClick={() => handleGameSetting()} className={'block px-4 py-3 text-gray-600 text-sm capitalize duration-300 hover:bg-primary-100 hover:text-gray-700 w-full text-left'}>
                    {'Game Setting'}
                  </button>
                  <hr />
                  <button onClick={() => handleAddPlayer()} className={'block px-4 py-3 text-gray-600 text-sm capitalize duration-300 hover:bg-primary-100 hover:text-gray-700 w-full text-left'}>
                    {'Add player'}
                  </button>
                  <hr />
                  <button onClick={() => handleResetData()} className={'block px-4 py-3 text-gray-600 text-sm capitalize duration-300 hover:bg-primary-100 hover:text-gray-700 w-full text-left'}>
                    {'Reset Data'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white mb-4 p-4 rounded shadow'>
          <div className="text-lg font-bold mb-4">Game Setting</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <div>Normal game price</div>
              <div>{displayMoney(gameSetting.normalGamePrice)}</div>
            </div>
            <div>
              <div>Rubber game price</div>
              <div>{displayMoney(gameSetting.rubberGamePrice)}</div>
            </div>
            <div>
              <div>Ball price</div>
              <div>{displayMoney(gameSetting.ballPrice)}</div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          {players.map((player, key) => {
            let playerprice = (player.normalGame * gameSetting.normalGamePrice) + (player.rubberGame * gameSetting.rubberGamePrice) + (player.ball * gameSetting.ballPrice)
            total += playerprice
            switch (player.paymentMethod) {
              case 'cash':
                totalcash += playerprice
                break;
              case 'transfer':
                totaltransfer += playerprice
              default:
                totalunpaid += playerprice
                break;
            }
            return (
              <div key={key} className='bg-white p-4 rounded shadow'>
                <div className="flex items-center">
                  <div className='w-full flex justify-between rounded items-center'>
                    <div className="flex items-center">
                      <div className='flex items-start font-bold capitalize mr-2'>
                        {player.name}
                      </div>
                      <button type={'button'} className={'text-rose-500 flex justify-center items-center size-8'} onClick={() => toggleDeletePlayer(key)}>
                        <TbTrash className='' size={'1.2rem'} />
                      </button>
                    </div>

                    <div className="flex items-center">
                      {player.paymentMethod && <span className="text-xs font-bold bg-green-500 text-white px-2 py-1 rounded-full mr-4 uppercase">{player.paymentMethod}</span>}
                      <button onClick={() => toggleAccordion(key)} className='flex items-center hover:bg-gray-100 rounded -m-2 p-2'>
                        <div className='flex justify-center items-center rounded size-8'>
                          <MdOutlineKeyboardArrowRight className={`rotate-0 duration-300 ${accordion.includes(key) && 'rotate-90'}`} size={'1.5rem'} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`duration-300 overflow-hidden ${accordion.includes(key) ? 'max-h-80 ' : 'max-h-0 '}`}>
                  <div className="flex justify-between items-center mb-4 mt-4">
                    <div>Normal Game</div>
                    <div className="flex items-center">
                      <button type={'button'} className={'text-gray-50 bg-rose-400 disabled:bg-gray-400 font-bold rounded-full h-6 w-6 flex justify-center items-center'} onClick={() => handleActionPlayer(key, { ...player, normalGame: player.normalGame - 1 })} disabled={player.normalGame === 0}>
                        <MdRemove className='' size={'1rem'} />
                      </button>
                      <div className="mx-4">{player.normalGame}</div>
                      <button type={'button'} className={'text-gray-50 bg-primary-400 disabled:bg-gray-400 font-bold rounded-full h-6 w-6 flex justify-center items-center'} onClick={() => handleActionPlayer(key, { ...player, normalGame: player.normalGame + 1 })}>
                        <MdAdd className='' size={'1rem'} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>Rubber Game</div>
                    <div className="flex items-center">
                      <button type={'button'} className={'text-gray-50 bg-rose-400 disabled:bg-gray-400 font-bold rounded-full h-6 w-6 flex justify-center items-center'} onClick={() => handleActionPlayer(key, { ...player, rubberGame: player.rubberGame - 1 })} disabled={player.rubberGame === 0}>
                        <MdRemove className='' size={'1rem'} />
                      </button>
                      <div className="mx-4">{player.rubberGame}</div>
                      <button type={'button'} className={'text-gray-50 bg-primary-400 disabled:bg-gray-400 font-bold rounded-full h-6 w-6 flex justify-center items-center'} onClick={() => handleActionPlayer(key, { ...player, rubberGame: player.rubberGame + 1 })}>
                        <MdAdd className='' size={'1rem'} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>Ball</div>
                    <div className="flex items-center">
                      <button type={'button'} className={'text-gray-50 bg-rose-400 disabled:bg-gray-400 font-bold rounded-full h-6 w-6 flex justify-center items-center'} onClick={() => handleActionPlayer(key, { ...player, ball: player.ball - 1 })} disabled={player.ball === 0}>
                        <MdRemove className='' size={'1rem'} />
                      </button>
                      <div className="mx-4">{player.ball}</div>
                      <button type={'button'} className={'text-gray-50 bg-primary-400 disabled:bg-gray-400 font-bold rounded-full h-6 w-6 flex justify-center items-center'} onClick={() => handleActionPlayer(key, { ...player, ball: player.ball + 1 })}>
                        <MdAdd className='' size={'1rem'} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right mb-4">
                    <div className="flex justify-end">
                      <label className={'w-32 select-none py-2 flex items-center justify-end cursor-pointermb-2'} >
                        <span className='truncate'>{"Cash"}</span>
                        <input
                          className={'ml-4 mr-1 accent-primary-600 py-2 scale-150'}
                          type={"checkbox"}
                          checked={player.paymentMethod === 'cash'}
                          onChange={() => handleActionPlayer(key, { ...player, paymentMethod: player.paymentMethod === 'cash' ? '' : 'cash' })}
                        />
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <label className={'w-32 select-none py-2 flex items-center justify-end cursor-pointermb-2'} >
                        <span className='truncate'>{"Transfer"}</span>
                        <input
                          className={'ml-4 mr-1 accent-primary-600 py-2 scale-150'}
                          type={"checkbox"}
                          checked={player.paymentMethod === 'transfer'}
                          onChange={() => handleActionPlayer(key, { ...player, paymentMethod: player.paymentMethod === 'transfer' ? '' : 'transfer' })}
                        />
                      </label>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="mr-2">Total Price</div>
                    {playerprice ? (
                      <div className={`font-bold ${player.paymentMethod !== '' ? 'text-green-500' : 'text-rose-500'}`}>{displayMoney(playerprice)}</div>
                    ) : (
                      <div className={`font-bold `}>{displayMoney(playerprice)}</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='bg-white mb-4 p-4 rounded shadow'>
          <div className="text-lg font-bold mb-4">Summary</div>
          <div className='grid grid-cols-1 gap-2'>
            <div className="flex justify-between items-center">
              <div>Cash</div>
              <div className="">{displayMoney(totalcash)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Transfer</div>
              <div className="">{displayMoney(totaltransfer)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Total paid</div>
              <div className="text-green-500">{displayMoney(totalcash + totaltransfer)}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Total unpaid</div>
              <div className="text-rose-500">{displayMoney(totalunpaid)}</div>
            </div>
            <hr className="mb-2" />
            <div className="flex justify-between items-center font-bold">
              <div>Total</div>
              <div>{displayMoney(total)}</div>
            </div>
            <hr className="mb-2" />
            <div className="flex justify-between items-center font-bold">
              <div>Players</div>
              <div className="">{players.length}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

(Game as PageWithLayoutType).layout = Main;

export default Game;