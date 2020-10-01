from google.cloud import translate_v2 as translate
from src.constants.constants import GCLOUD_KEYFILE_PATH
import functools
from glob import glob
import random
import os

from typing import Any


def get_translation(text_to_translate, target_language):
    """Translates text into the target language.
    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """
    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = _get_client().translate(text_to_translate, target_language=target_language)
    return result["translatedText"]


# returns a list of all the lang-codes available
def get_supported_languages(verbose=False):
    """Lists all available languages for gCloud translate API."""
    results = _get_client().get_languages()
    if verbose:
        for language in results:
            print("{name} ({language})".format(**language))
    return [r["language"] for r in results]


# Cached so that we don't check every time we get a client
@functools.lru_cache()
def keyfile_count() -> int:
    return len(glob(os.path.join(GCLOUD_KEYFILE_PATH, ".gcloud_*")))


@functools.lru_cache()
def _generate_client(client_num: int) -> Any:
    try:
        keyfile = os.path.join(
            GCLOUD_KEYFILE_PATH, f".gcloud_{client_num}.keyfile.json"
        )
        return translate.Client.from_service_account_json(keyfile)
    except Exception as e:
        print(e)
        return None


# Will check for keyfile credentials
# returns None on failure
# SCOPE: Private
def _get_client() -> Any:
    return _generate_client(random.randint(1, keyfile_count()))
