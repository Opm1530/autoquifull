/**
 * Whisper Service — transcrição de áudio via OpenAI
 *
 * Recebe base64 + mimetype, salva em arquivo temporário,
 * envia para o Whisper e retorna o texto transcrito.
 */

import { createReadStream, writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { OpenAI } from 'openai';
import { ENV } from '../config/env.js';

const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

/**
 * Transcreve um áudio base64 para texto em português.
 *
 * @param {string} base64 - Áudio em base64
 * @param {string} mimetype - Ex: 'audio/ogg', 'audio/mp4'
 * @returns {string} Texto transcrito ou string vazia se falhar
 */
export async function transcribeAudio(base64, mimetype = 'audio/ogg') {
  const ext = getExtension(mimetype);
  const tmpPath = join(tmpdir(), `autoqui_audio_${Date.now()}${ext}`);

  try {
    // Salva o arquivo temporário
    const buffer = Buffer.from(base64, 'base64');
    writeFileSync(tmpPath, buffer);

    // Envia para o Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: createReadStream(tmpPath),
      model: 'whisper-1',
      language: 'pt',
      response_format: 'text',
    });

    const text = typeof transcription === 'string' ? transcription : transcription.text;
    console.log('[Whisper] Transcrição:', text?.slice(0, 100));
    return text || '';
  } catch (err) {
    console.error('[Whisper] Erro ao transcrever áudio:', err.message);
    return '';
  } finally {
    // Garante remoção do arquivo temporário
    try {
      unlinkSync(tmpPath);
    } catch {}
  }
}

/**
 * Mapeia mimetype para extensão de arquivo.
 */
function getExtension(mimetype) {
  const map = {
    'audio/ogg': '.ogg',
    'audio/mp4': '.mp4',
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'audio/webm': '.webm',
    'audio/aac': '.aac',
    'audio/x-m4a': '.m4a',
  };
  return map[mimetype] || '.ogg';
}
