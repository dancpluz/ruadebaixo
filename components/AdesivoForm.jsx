'use client'

import styled from 'styled-components';
import Image from 'next/image';
import InputBox from '@/components/InputBox';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Cart';
import { Paper } from '@mui/material';
import fileUp from '@/public/assets/icons/file-up.svg'
import plus from '@/public/assets/icons/plus.svg'
import { sendMessageSticker } from '@/lib/bot'
import { useState, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 4/5;
  border: 1px solid #000;
`;

const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

const CheckBox = styled.input`

`;


export default function AdesivoForm() {
  const { register,handleSubmit,setValue,resetField,formState: { isSubmitSuccessful,errors } } = useForm();
  const [formResult, setFormResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [imgPreviews, setImgPreviews] = useState([]);
  const [imgHoverText,setImgHoverText] = useState('');
  const imgInputRef = useRef(null);

  const [vidPreview, setVidPreview] = useState(null);
  const [vidHoverText,setVidHoverText] = useState('');
  const vidInputRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const formData = new FormData()

      const instaHandle = data.insta.replace('@','').toLowerCase();

      formData.append('data', JSON.stringify({ nome: data.nome, insta: data.insta, anonimo: data.anonimo, feedback: data.feedback }));

      for (let i = 0; i < data.imagens.length; i++) {
        const file = data.imagens[i];
        const newFileName = `${instaHandle}-${i}${file.name.substring(file.name.lastIndexOf('.'))}`;
        const renamedFile = new File([file], newFileName, { type: file.type });

        formData.append('files.imagens', renamedFile);
      }

      if (data.video) {
        console.log(data.viado)
        const file = data.video;
        const newFileName = `${instaHandle}-video${file.name.substring(file.name.lastIndexOf('.'))}`;
        const renamedFile = new File([file], newFileName, { type: file.type });

        formData.append('files.video', renamedFile);
      }

      const req = await fetch('/db/adesivos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`
        },
        body: formData
      })

      const res = await req.json()
      if (res.error) {
        console.log(res.error)
        setFormResult('Ocorreu um erro inesperado:\n' + JSON.stringify(res.error, null, 2))
        setIsLoading(false)
      } else {
        console.log(res)
        setFormResult('Enviado com sucesso! Não se esquece de postar a foto ou o vídeo nos stories e marcar @ruadebaixoloja')
        setIsLoading(false)
        await sendMessageSticker(data);
      }
    } catch(error) {
      console.log(error)
      setFormResult('Ocorreu um erro inesperado:\n' + JSON.stringify(error.message, null, 2))
      setIsLoading(false)
    }
  };

  const handleDropImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const validate = validateImages(files);

    if (validate === true) {
      setValue('imagens', files);
      const imagePreviews = files.map(file => URL.createObjectURL(file));
      setImgPreviews(imagePreviews);
    } else {
      alert(validate);
    }
  };

  const handleDropVid = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = Array.from(e.dataTransfer.files)[0];
    const validate = validateVideo(file);

    if (validate === true) {
      setValue('video',file);
      const videoPreview = URL.createObjectURL(file);
      setVidPreview(videoPreview);
    } else {
      alert(validate);
    }
  };

  const handleClearImg = (e) => {
    e.stopPropagation();
    resetField('imagens');
    setImgPreviews([]);
  }

  const handleClearVid = (e) => {
    e.stopPropagation();
    resetField('video');
    setVidPreview(null);
  }

  const validateImages = (value) => {
    if (value.length > 3) {
      return 'Aceitamos no máximo 3 imagens';
    }
    
    for (let i = 0; i < value.length; i++) {
      const file = value[i];
      const fileExtension = value[i].name.split('.').pop().toLowerCase();
      const acceptedFormats = ['jpg','jpeg','png','bmp','webp','heic','raw'];
      
      if (!acceptedFormats.includes(fileExtension)) {
        return 'Formato inválido na foto ' + (i+1);
      }
      
      const maxSizeInMB = 10;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        return `A imagem ${i + 1} é maior que ${maxSizeInMB}MB.`;
      }
    }

    return true
  };

  const handleFilesImg = (e) => {
    const files = Array.from(e.target.files);
    const validate = validateImages(files);

    if (validate === true) {
      setValue('imagens',files);
      const imagePreviews = files.map(file => URL.createObjectURL(file));
      setImgPreviews(imagePreviews);
    } else {
      alert(validate);
    }
  };
  
  const handleFilesVid = (e) => {
    const file = Array.from(e.target.files)[0];
    const validate = validateVideo(file);
    
    if (validate === true) {
      setValue('video',file);
      const videoPreview = URL.createObjectURL(file);
      setVidPreview(videoPreview);
    } else {
      alert(validate);
    }
  };
  
  const validateVideo = (file) => {
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const acceptedFormats = ['avi','mp4','mkv','mov','webm','mpeg','wmv'];

      if (!acceptedFormats.includes(fileExtension)) {
        return 'Formato inválido de vídeo ';
      }

      const maxSizeInMB = 30;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        return `O vídeo é maior que ${maxSizeInMB}MB.`;
      }

      return true;
    }
  };

  const adjustInsta = (value) => {
    if (!value.startsWith('@')) {
      return '@';
    }

    const cleanValue = value.slice(1).replace(/[^a-zA-Z0-9_.]/g,'');
    return `@${cleanValue.substring(0,30)}`;
  };

  return (
    <div>
      <form style={{ display: 'flex', gap: '16px' }} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Inscrições Abertas!</h2>
          <p>Preencha o formulário para enviar sua submissão</p>
        </div>
        <InputBox title={'Nome ou Apelido*'} span={'Como devemos te chamar?'} error={errors.nome}>
          <input
            type='text'
            placeholder='ex. Guigão'
            {...register('nome',{
              required: '(Obrigatório)',
              maxLength: { value: 50,message: '(Limite de caracteres excedido)' }
            })}
          />
        </InputBox>
        <InputBox title={'Seu Instagram*'} span={'Vamos nos comunicar com você por aqui, vamos checar o stories também.'} error={errors.insta}>
          <input
            type='text'
            placeholder='ex. @ruadebaixoloja'
            {...register('insta',{
              required: '(Obrigatório)',
              onChange: (e) => setValue('insta',adjustInsta(e.target.value)),
            })}
          />
        </InputBox>
        <InputBox title={'Fotos do Adesivo*'} span={'Até 3 fotos. Formatos aceitos: JPG, PNG, WEBP, HEIC.'} error={errors.imagens}>
          <Paper
            onMouseEnter={() => setImgHoverText('Clique aqui para adicionar suas imagens')}
            onMouseLeave={() => setImgHoverText('')}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setImgHoverText('Solte aqui para adicionar suas imagens')}
            onDragLeave={() => setImgHoverText('')}
            onDrop={handleDropImg}
            onClick={() => imgInputRef.current.click()}
            sx={{
              position: 'relative',
              padding: '16px',
              textAlign: 'center',
              border: '2px dashed #000',
              boxShadow: 'none',
              cursor: 'pointer'
            }}
          >
          {imgHoverText && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
              }}
            >
              {imgHoverText}
            </div>
        )}
          <Image src={fileUp} alt={'Ícone de enviar arquivo'} width={40} height={40} />
          {imgPreviews.length === 0 && <p style={{ fontSize: '14px', textDecoration: 'underline' }}>Tamanho máximo: 10MB</p>}
          <input
            accept="image/*"
            multiple
            type='file'
            {...register('imagens',{
              required: '(Obrigatório)',
              validate: validateImages,
              onChange: handleFilesImg,
            })}
            ref={imgInputRef}
            style={{ display: 'none' }}
          />
            {imgPreviews.length > 0 && (
              <>
                <Wrapper style={{ display: 'flex' }}>
                  {imgPreviews.map((src,index) => (
                    <ImagePreview key={index}>
                      <Image
                        src={src}
                        fill
                        alt={`preview ${index}`}
                        style={{
                          objectFit: 'cover'
                        }}
                      />
                    </ImagePreview>
                  ))}
                </Wrapper>
                <div style={{marginTop: '8px'}} onClick={handleClearImg}>
                <Image style={{paddingRight: '8px', rotate: '-45deg'}} src={plus} alt={'Ícone de excluir'} width={18} height={18} />
                <span style={{ marginTop: '8px' }}>{imgPreviews.length} Image{imgPreviews.length > 1 ? 'ns' : 'm'} enviada{imgPreviews.length > 1 && 's'}</span>
                </div>
              </>
            )}
          </Paper>
        </InputBox>
        <InputBox title={'Vídeo do Adesivo'} span={'Formatos aceitos: AVI, MP4, MOV, WEBM.'} error={errors.video}>
          <Paper
            onMouseEnter={() => setVidHoverText('Clique aqui para adicionar seu vídeo')}
            onMouseLeave={() => setVidHoverText('')}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setVidHoverText('Solte aqui para adicionar seu vídeo')}
            onDragLeave={() => setVidHoverText('')}
            onDrop={handleDropVid}
            onClick={() => vidInputRef.current.click()}
            sx={{
              position: 'relative',
              padding: '16px',
              textAlign: 'center',
              border: '2px dashed #000',
              boxShadow: 'none',
              cursor: 'pointer'
            }}
          >
          {vidHoverText && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
              }}
            >
              {vidHoverText}
            </div>
        )}
          <Image src={fileUp} alt={'Ícone de enviar arquivo'} width={40} height={40} />
          {!vidPreview && <p style={{ fontSize: '14px', textDecoration: 'underline' }}>Tamanho máximo: 30MB</p>}
          <input
            accept="video/*"
            type='file'
            {...register('video',{
              validate: validateVideo,
              onChange: handleFilesVid,
            })}
            ref={vidInputRef}
            style={{ display: 'none' }}
          />
            {vidPreview && (
              <>
                <Wrapper style={{ display: 'flex' }}>
                    <ImagePreview>
                      <video
                        width="300px"
                        height="480px"
                        controls
                        src={vidPreview}
                        alt={`preview video`}
                        style={{
                          display: 'block',
                          objectFit: 'cover'
                        }}
                      />
                    </ImagePreview>
                </Wrapper>
                <div style={{marginTop: '8px'}} onClick={handleClearVid}>
                <Image style={{paddingRight: '8px', rotate: '-45deg'}} src={plus} alt={'Ícone de excluir'} width={18} height={18} />
                <span style={{ marginTop: '8px' }}>Vídeo enviado</span>
                </div>
              </>
            )}
          </Paper>
        </InputBox>
        <InputBox title={'Anônimo?'} span={'Caso não queira que seu instagram ou nome seja divulgado. Mas ainda saberemos essas informações.'} error={errors.anonimo}>
          <CheckBox type='checkbox' {...register("anonimo")}/>
        </InputBox>
        <InputBox title={'Feedback'} span={'.'} error={errors.feedback}>
          <textarea {...register("feedback")} />
        </InputBox>
        <Button style={{ marginTop: '8px' }} disabled={isLoading || isSubmitSuccessful}>
          {isLoading ? <CircularProgress color='inherit' /> : isSubmitSuccessful ? 'SUCESSO!' : 'INSCREVER-SE'}
        </Button>
      </form>
      {formResult && 
        <div style={{ display: 'flex', marginTop:'8px', alignItems: 'center', justifyContent: 'center', background: 'black', padding: '8px' }}>
          <p style={{ color:'white', textAlign: 'center', fontSize: '20px' }}>{formResult}</p>
        </div>}
    </div>
  )
}
